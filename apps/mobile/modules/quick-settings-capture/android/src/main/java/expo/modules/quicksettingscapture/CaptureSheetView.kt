package expo.modules.quicksettingscapture

import android.content.Context
import android.graphics.Color
import android.graphics.Typeface
import android.graphics.drawable.GradientDrawable
import android.util.TypedValue
import android.view.Gravity
import android.view.View
import android.widget.Button
import android.widget.FrameLayout
import android.widget.LinearLayout
import android.widget.TextView

class CaptureSheetView(
  context: Context,
  onRetry: () -> Unit,
  onClose: () -> Unit,
) : FrameLayout(context) {
  private val status = text(STATUS_SIZE_SP, Typeface.BOLD, TEXT_COLOR)
  private val transcript = text(TRANSCRIPT_SIZE_SP, Typeface.NORMAL, MUTED_COLOR)
  private val retryButton = button("Falar de novo", PRIMARY_COLOR, Color.WHITE, onRetry)

  init {
    setOnClickListener { onClose() }
    addView(sheet(onClose), LayoutParams(LayoutParams.MATCH_PARENT, LayoutParams.WRAP_CONTENT, Gravity.BOTTOM))
  }

  fun showListening() = show("Ouvindo… fale o item", "", retryVisible = false)

  fun showTranscript(text: String) {
    transcript.text = text
  }

  fun showSaving(text: String) = show("Salvando…", text, retryVisible = false)

  fun showSaved(message: String) = show(message, "", retryVisible = false)

  fun showError(message: String) = show(message, "", retryVisible = true)

  private fun show(statusText: String, transcriptText: String, retryVisible: Boolean) {
    status.text = statusText
    transcript.text = transcriptText
    retryButton.visibility = if (retryVisible) View.VISIBLE else View.GONE
  }

  private fun sheet(onClose: () -> Unit) = LinearLayout(context).apply {
    orientation = LinearLayout.VERTICAL
    gravity = Gravity.CENTER_HORIZONTAL
    background = roundedTop(BACKGROUND_COLOR)
    setPadding(dp(24), dp(24), dp(24), dp(40))
    isClickable = true
    addView(text(TITLE_SIZE_SP, Typeface.BOLD, TEXT_COLOR).apply { text = "Adicionar à lista" })
    addView(status, spaced())
    addView(transcript, spaced())
    addView(actions(onClose), spaced())
  }

  private fun actions(onClose: () -> Unit) = LinearLayout(context).apply {
    gravity = Gravity.CENTER
    addView(retryButton)
    addView(button("Fechar", SURFACE_COLOR, TEXT_COLOR, onClose), LinearLayout.LayoutParams(
      LinearLayout.LayoutParams.WRAP_CONTENT,
      LinearLayout.LayoutParams.WRAP_CONTENT,
    ).apply { marginStart = dp(12) })
  }

  private fun text(sizeSp: Float, style: Int, color: Int) = TextView(context).apply {
    setTextSize(TypedValue.COMPLEX_UNIT_SP, sizeSp)
    setTypeface(typeface, style)
    setTextColor(color)
    gravity = Gravity.CENTER
  }

  private fun button(label: String, background: Int, textColor: Int, onPress: () -> Unit) =
    Button(context).apply {
      text = label
      isAllCaps = false
      setTextColor(textColor)
      this.background = rounded(background)
      setPadding(dp(20), dp(10), dp(20), dp(10))
      setOnClickListener { onPress() }
    }

  private fun spaced() = LinearLayout.LayoutParams(
    LinearLayout.LayoutParams.MATCH_PARENT,
    LinearLayout.LayoutParams.WRAP_CONTENT,
  ).apply { topMargin = dp(16) }

  private fun rounded(color: Int) = GradientDrawable().apply {
    setColor(color)
    cornerRadius = dp(24).toFloat()
  }

  private fun roundedTop(color: Int) = GradientDrawable().apply {
    setColor(color)
    val radius = dp(20).toFloat()
    cornerRadii = floatArrayOf(radius, radius, radius, radius, 0f, 0f, 0f, 0f)
  }

  private fun dp(value: Int): Int =
    TypedValue.applyDimension(TypedValue.COMPLEX_UNIT_DIP, value.toFloat(), resources.displayMetrics).toInt()

  private companion object {
    const val TITLE_SIZE_SP = 20f
    const val STATUS_SIZE_SP = 17f
    const val TRANSCRIPT_SIZE_SP = 15f
    val BACKGROUND_COLOR = Color.parseColor("#F6F7F4")
    val SURFACE_COLOR = Color.parseColor("#E2E6E1")
    val TEXT_COLOR = Color.parseColor("#1D2420")
    val MUTED_COLOR = Color.parseColor("#6B746E")
    val PRIMARY_COLOR = Color.parseColor("#2F8F5B")
  }
}
