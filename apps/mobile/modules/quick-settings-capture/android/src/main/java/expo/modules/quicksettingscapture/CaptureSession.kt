package expo.modules.quicksettingscapture

import android.content.Context
import android.os.Handler
import android.os.Looper

class CaptureSession(
  private val context: Context,
  private val sheet: CaptureSheetView,
  private val onDone: () -> Unit,
) : SpeechCaptureListener {
  private val speech = SpeechCapture(context, this)
  private val mainHandler = Handler(Looper.getMainLooper())

  fun begin() {
    if (CaptureCredentialsStore.read(context) == null) sheet.showError(SIGNED_OUT_MESSAGE)
    else listen()
  }

  fun listen() {
    sheet.showListening()
    speech.start()
  }

  fun destroy() {
    mainHandler.removeCallbacksAndMessages(null)
    speech.destroy()
  }

  override fun onPartialTranscript(text: String) = sheet.showTranscript(text)

  override fun onFinalTranscript(text: String) {
    val credentials = CaptureCredentialsStore.read(context) ?: return sheet.showError(SIGNED_OUT_MESSAGE)
    sheet.showSaving(text)
    Thread { deliver(CaptureApiClient.capture(credentials, text)) }.start()
  }

  override fun onSpeechError(message: String) = sheet.showError(message)

  private fun deliver(outcome: CaptureOutcome) = mainHandler.post {
    when (outcome) {
      is CaptureOutcome.Saved -> finishAfterSaving(outcome.message)
      is CaptureOutcome.Failed -> sheet.showError(outcome.message)
    }
  }

  private fun finishAfterSaving(message: String) {
    sheet.showSaved(message)
    mainHandler.postDelayed(onDone, CLOSE_DELAY_MS)
  }

  private companion object {
    const val CLOSE_DELAY_MS = 1400L
    const val SIGNED_OUT_MESSAGE = "Abra o Meu Mercado e entre na sua conta para usar este botão."
  }
}
