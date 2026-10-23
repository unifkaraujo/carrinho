package expo.modules.quicksettingscapture

import android.content.Context
import android.graphics.Color
import android.graphics.Typeface
import android.graphics.drawable.GradientDrawable
import android.os.Build
import android.util.TypedValue
import android.view.Gravity
import android.view.View
import android.view.WindowInsets
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
  private val sheet = sheet(onClose)

  init {
    setOnClickListener { onClose() }
    addView(sheet, LayoutParams(LayoutParams.MATCH_PARENT, LayoutParams.WRAP_CONTENT, Gravity.BOTTOM))
    sheet.setOnApplyWindowInsetsListener { view, insets ->
      view.setPadding(dp(24), dp(12), dp(24), dp(28) + bottomInset(insets))
      insets
    }
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
    transcript.visibility = if (transcriptText.isEmpty()) View.GONE else View.VISIBLE
    retryButton.visibility = if (retryVisible) View.VISIBLE else View.GONE
  }

  private fun bottomInset(insets: WindowInsets): Int =
    if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.R) {
      insets.getInsets(WindowInsets.Type.systemBars() or WindowInsets.Type.ime()).bottom
    } else {
      @Suppress("DEPRECATION")
      insets.systemWindowInsetBottom
    }

  private fun sheet(onClose: () -> Unit) = LinearLayout(context).apply {
    orientation = LinearLayout.VERTICAL
    gravity = Gravity.CENTER_HORIZONTAL
    background = roundedTop(BACKGROUND_COLOR)
    setPadding(dp(24), dp(12), dp(24), dp(28))
    isClickable = true
    addView(handle(), LinearLayout.LayoutParams(dp(40), dp(5)))
    addView(micBadge(), LinearLayout.LayoutParams(dp(64), dp(64)).apply { topMargin = dp(20) })
    addView(text(TITLE_SIZE_SP, Typeface.BOLD, TEXT_COLOR).apply { text = "Adicionar ao Carrinho" }, spaced())
    addView(status, spaced(8))
    addView(transcript, spaced(8))
    addView(actions(onClose), spaced(20))
  }

  private fun handle() = View(context).apply { background = rounded(BORDER_COLOR, 3) }

  private fun micBadge() = TextView(context).apply {
    text = "🎤"
    gravity = Gravity.CENTER
    setTextSize(TypedValue.COMPLEX_UNIT_SP, 28f)
    background = rounded(PRIMARY_SOFT_COLOR, 32)
  }

  private fun actions(onClose: () -> Unit) = LinearLayout(context).apply {
    gravity = Gravity.CENTER
    addView(retryButton)
    addView(button("Fechar", SURFACE_MUTED_COLOR, TEXT_COLOR, onClose), LinearLayout.LayoutParams(
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
      stateListAnimator = null
      setTypeface(typeface, Typeface.BOLD)
      setTextColor(textColor)
      this.background = rounded(background, 26)
      minHeight = dp(52)
      setPadding(dp(24), 0, dp(24), 0)
      setOnClickListener { onPress() }
    }

  private fun spaced(top: Int = 16) = LinearLayout.LayoutParams(
    LinearLayout.LayoutParams.MATCH_PARENT,
    LinearLayout.LayoutParams.WRAP_CONTENT,
  ).apply { topMargin = dp(top) }

  private fun rounded(color: Int, radiusDp: Int) = GradientDrawable().apply {
    setColor(color)
    cornerRadius = dp(radiusDp).toFloat()
  }

  private fun roundedTop(color: Int) = GradientDrawable().apply {
    setColor(color)
    val radius = dp(28).toFloat()
    cornerRadii = floatArrayOf(radius, radius, radius, radius, 0f, 0f, 0f, 0f)
  }

  private fun dp(value: Int): Int =
    TypedValue.applyDimension(TypedValue.COMPLEX_UNIT_DIP, value.toFloat(), resources.displayMetrics).toInt()

  private companion object {
    const val TITLE_SIZE_SP = 20f
    const val STATUS_SIZE_SP = 17f
    const val TRANSCRIPT_SIZE_SP = 15f
    val BACKGROUND_COLOR = Color.parseColor("#F2F6EE")
    val SURFACE_MUTED_COLOR = Color.parseColor("#E7EFE2")
    val BORDER_COLOR = Color.parseColor("#DCE5D6")
    val TEXT_COLOR = Color.parseColor("#14231A")
    val MUTED_COLOR = Color.parseColor("#64736A")
    val PRIMARY_COLOR = Color.parseColor("#1F9D55")
    val PRIMARY_SOFT_COLOR = Color.parseColor("#DCF2E3")
  }
}
