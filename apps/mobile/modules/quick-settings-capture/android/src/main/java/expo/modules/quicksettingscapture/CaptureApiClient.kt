package expo.modules.quicksettingscapture

import org.json.JSONObject
import java.io.IOException
import java.net.HttpURLConnection
import java.net.URL

sealed class CaptureOutcome {
  data class Saved(val message: String) : CaptureOutcome()
  data class Failed(val message: String) : CaptureOutcome()
}

object CaptureApiClient {
  private const val TIMEOUT_MS = 15_000
  private const val UNAUTHORIZED = 401
  private const val UNPROCESSABLE = 422
  private const val SUCCESS_RANGE_START = 200
  private const val SUCCESS_RANGE_END = 299

  fun capture(credentials: CaptureCredentials, text: String): CaptureOutcome =
    try {
      send(credentials, text)
    } catch (error: IOException) {
      CaptureOutcome.Failed("Sem internet. Tente de novo.")
    }

  private fun send(credentials: CaptureCredentials, text: String): CaptureOutcome {
    val connection = URL("${credentials.apiUrl}/capture").openConnection() as HttpURLConnection
    try {
      connection.requestMethod = "POST"
      connection.connectTimeout = TIMEOUT_MS
      connection.readTimeout = TIMEOUT_MS
      connection.doOutput = true
      connection.setRequestProperty("Content-Type", "application/json; charset=utf-8")
      connection.setRequestProperty("Authorization", "Bearer ${credentials.token}")
      connection.outputStream.use { it.write(JSONObject().put("text", text).toString().toByteArray()) }
      return toOutcome(connection)
    } finally {
      connection.disconnect()
    }
  }

  private fun toOutcome(connection: HttpURLConnection): CaptureOutcome {
    val status = connection.responseCode
    if (status in SUCCESS_RANGE_START..SUCCESS_RANGE_END) {
      return CaptureOutcome.Saved(readMessage(connection) ?: "Adicionado")
    }
    return CaptureOutcome.Failed(describeFailure(status))
  }

  private fun readMessage(connection: HttpURLConnection): String? {
    val body = connection.inputStream.bufferedReader().use { it.readText() }
    return JSONObject(body).optString("message").ifBlank { null }
  }

  private fun describeFailure(status: Int): String = when (status) {
    UNAUTHORIZED -> "Abra o Carrinho e entre na sua conta."
    UNPROCESSABLE -> "Não entendi o item. Tente de novo."
    else -> "Não foi possível salvar. Tente de novo."
  }
}
