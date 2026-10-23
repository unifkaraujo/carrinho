package expo.modules.quicksettingscapture

import android.content.Context

data class CaptureCredentials(val apiUrl: String, val tokenId: String, val token: String)

object CaptureCredentialsStore {
  private const val PREFERENCES_NAME = "meu_mercado_quick_settings_capture"
  private const val API_URL_KEY = "api_url"
  private const val TOKEN_ID_KEY = "token_id"
  private const val TOKEN_KEY = "token"

  fun save(context: Context, credentials: CaptureCredentials) {
    preferences(context).edit()
      .putString(API_URL_KEY, credentials.apiUrl)
      .putString(TOKEN_ID_KEY, credentials.tokenId)
      .putString(TOKEN_KEY, credentials.token)
      .apply()
  }

  fun read(context: Context): CaptureCredentials? {
    val preferences = preferences(context)
    val apiUrl = preferences.getString(API_URL_KEY, null) ?: return null
    val tokenId = preferences.getString(TOKEN_ID_KEY, null) ?: return null
    val token = preferences.getString(TOKEN_KEY, null) ?: return null
    return CaptureCredentials(apiUrl, tokenId, token)
  }

  fun clear(context: Context) {
    preferences(context).edit().clear().apply()
  }

  private fun preferences(context: Context) =
    context.applicationContext.getSharedPreferences(PREFERENCES_NAME, Context.MODE_PRIVATE)
}
