package expo.modules.quicksettingscapture

import android.content.Context
import android.content.Intent
import android.os.Bundle
import android.speech.RecognitionListener
import android.speech.RecognizerIntent
import android.speech.SpeechRecognizer

interface SpeechCaptureListener {
  fun onPartialTranscript(text: String)
  fun onFinalTranscript(text: String)
  fun onSpeechError(message: String)
}

class SpeechCapture(context: Context, private val listener: SpeechCaptureListener) :
  RecognitionListener {
  private val recognizer = SpeechRecognizer.createSpeechRecognizer(context).also {
    it.setRecognitionListener(this)
  }

  fun start() {
    val intent = Intent(RecognizerIntent.ACTION_RECOGNIZE_SPEECH)
      .putExtra(RecognizerIntent.EXTRA_LANGUAGE_MODEL, RecognizerIntent.LANGUAGE_MODEL_FREE_FORM)
      .putExtra(RecognizerIntent.EXTRA_LANGUAGE, LANGUAGE)
      .putExtra(RecognizerIntent.EXTRA_PARTIAL_RESULTS, true)
    recognizer.startListening(intent)
  }

  fun destroy() {
    recognizer.destroy()
  }

  override fun onPartialResults(partialResults: Bundle?) {
    firstTranscript(partialResults)?.let(listener::onPartialTranscript)
  }

  override fun onResults(results: Bundle?) {
    val text = firstTranscript(results)
    if (text == null) listener.onSpeechError(NO_SPEECH_MESSAGE)
    else listener.onFinalTranscript(text)
  }

  override fun onError(error: Int) {
    listener.onSpeechError(describeError(error))
  }

  override fun onReadyForSpeech(params: Bundle?) = Unit
  override fun onBeginningOfSpeech() = Unit
  override fun onRmsChanged(rmsdB: Float) = Unit
  override fun onBufferReceived(buffer: ByteArray?) = Unit
  override fun onEndOfSpeech() = Unit
  override fun onEvent(eventType: Int, params: Bundle?) = Unit

  private fun firstTranscript(bundle: Bundle?): String? =
    bundle?.getStringArrayList(SpeechRecognizer.RESULTS_RECOGNITION)
      ?.firstOrNull()
      ?.takeIf { it.isNotBlank() }

  private fun describeError(error: Int): String = when (error) {
    SpeechRecognizer.ERROR_NO_MATCH, SpeechRecognizer.ERROR_SPEECH_TIMEOUT -> NO_SPEECH_MESSAGE
    SpeechRecognizer.ERROR_INSUFFICIENT_PERMISSIONS ->
      "Abra o Carrinho e permita o uso do microfone."
    SpeechRecognizer.ERROR_NETWORK, SpeechRecognizer.ERROR_NETWORK_TIMEOUT ->
      "Sem internet para reconhecer a voz."
    else -> "Não deu para ouvir. Tente de novo."
  }

  private companion object {
    const val LANGUAGE = "pt-BR"
    const val NO_SPEECH_MESSAGE = "Não ouvi nada. Toque em Falar de novo."
  }
}
