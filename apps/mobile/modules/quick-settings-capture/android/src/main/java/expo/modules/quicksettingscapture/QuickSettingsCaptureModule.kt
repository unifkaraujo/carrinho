package expo.modules.quicksettingscapture

import android.content.Context
import expo.modules.kotlin.exception.Exceptions
import expo.modules.kotlin.modules.Module
import expo.modules.kotlin.modules.ModuleDefinition

class QuickSettingsCaptureModule : Module() {
  private val context: Context
    get() = appContext.reactContext ?: throw Exceptions.ReactContextLost()

  override fun definition() = ModuleDefinition {
    Name("QuickSettingsCapture")

    Function("saveCredentials") { apiUrl: String, tokenId: String, token: String ->
      CaptureCredentialsStore.save(context, CaptureCredentials(apiUrl, tokenId, token))
    }

    Function("readTokenId") {
      CaptureCredentialsStore.read(context)?.tokenId
    }

    Function("clearCredentials") {
      CaptureCredentialsStore.clear(context)
    }
  }
}
