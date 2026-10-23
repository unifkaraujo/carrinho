package expo.modules.quicksettingscapture

import android.annotation.SuppressLint
import android.app.Dialog
import android.app.PendingIntent
import android.content.Intent
import android.os.Build
import android.service.quicksettings.Tile
import android.service.quicksettings.TileService
import android.view.ViewGroup

class CaptureTileService : TileService() {
  override fun onStartListening() {
    qsTile?.apply {
      state = Tile.STATE_INACTIVE
      updateTile()
    }
  }

  override fun onClick() {
    if (isLocked) showCaptureDialog() else openCaptureActivity()
  }

  private fun showCaptureDialog() {
    val dialog = Dialog(this, R.style.LockScreenCaptureTheme)
    lateinit var session: CaptureSession
    val sheet = CaptureSheetView(this, onRetry = { session.listen() }, onClose = dialog::dismiss)
    session = CaptureSession(this, sheet, onDone = dialog::dismiss)
    dialog.setContentView(sheet)
    dialog.setOnDismissListener { session.destroy() }
    showDialog(dialog)
    dialog.window?.setLayout(ViewGroup.LayoutParams.MATCH_PARENT, ViewGroup.LayoutParams.MATCH_PARENT)
    session.begin()
  }

  private fun openCaptureActivity() {
    val intent = Intent(this, LockScreenCaptureActivity::class.java)
      .addFlags(Intent.FLAG_ACTIVITY_NEW_TASK)
    if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.UPSIDE_DOWN_CAKE) {
      startActivityAndCollapse(
        PendingIntent.getActivity(this, 0, intent, PendingIntent.FLAG_IMMUTABLE)
      )
    } else {
      startLegacyActivityAndCollapse(intent)
    }
  }

  @SuppressLint("StartActivityAndCollapseDeprecated")
  @Suppress("DEPRECATION")
  private fun startLegacyActivityAndCollapse(intent: Intent) {
    startActivityAndCollapse(intent)
  }
}
