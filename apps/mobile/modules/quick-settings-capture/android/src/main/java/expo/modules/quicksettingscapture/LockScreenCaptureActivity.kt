package expo.modules.quicksettingscapture

import android.app.Activity
import android.os.Bundle
import android.os.Handler
import android.os.Looper

class LockScreenCaptureActivity : Activity(), SpeechCaptureListener {
  private lateinit var sheet: CaptureSheetView
  private lateinit var speech: SpeechCapture
  private val mainHandler = Handler(Looper.getMainLooper())

  override fun onCreate(savedInstanceState: Bundle?) {
    super.onCreate(savedInstanceState)
    sheet = CaptureSheetView(this, onRetry = ::listen, onClose = ::finish)
    setContentView(sheet)
    speech = SpeechCapture(this, this)
    if (CaptureCredentialsStore.read(this) == null) sheet.showError(SIGNED_OUT_MESSAGE)
    else listen()
  }

  override fun onDestroy() {
    mainHandler.removeCallbacksAndMessages(null)
    speech.destroy()
    super.onDestroy()
  }

  override fun onPartialTranscript(text: String) = sheet.showTranscript(text)

  override fun onFinalTranscript(text: String) {
    val credentials = CaptureCredentialsStore.read(this) ?: return sheet.showError(SIGNED_OUT_MESSAGE)
    sheet.showSaving(text)
    Thread { deliver(CaptureApiClient.capture(credentials, text)) }.start()
  }

  override fun onSpeechError(message: String) = sheet.showError(message)

  private fun listen() {
    sheet.showListening()
    speech.start()
  }

  private fun deliver(outcome: CaptureOutcome) = mainHandler.post {
    when (outcome) {
      is CaptureOutcome.Saved -> finishAfterSaving(outcome.message)
      is CaptureOutcome.Failed -> sheet.showError(outcome.message)
    }
  }

  private fun finishAfterSaving(message: String) {
    sheet.showSaved(message)
    mainHandler.postDelayed(::finish, CLOSE_DELAY_MS)
  }

  private companion object {
    const val CLOSE_DELAY_MS = 1400L
    const val SIGNED_OUT_MESSAGE = "Abra o Meu Mercado e entre na sua conta para usar este botão."
  }
}
