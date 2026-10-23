package expo.modules.quicksettingscapture

import android.app.Activity
import android.os.Bundle

class LockScreenCaptureActivity : Activity() {
  private lateinit var session: CaptureSession

  override fun onCreate(savedInstanceState: Bundle?) {
    super.onCreate(savedInstanceState)
    val sheet = CaptureSheetView(this, onRetry = { session.listen() }, onClose = ::finish)
    session = CaptureSession(this, sheet, onDone = ::finish)
    setContentView(sheet)
    session.begin()
  }

  override fun onDestroy() {
    session.destroy()
    super.onDestroy()
  }
}
