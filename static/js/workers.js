function selectText(node) {
  var selection = window.getSelection()
  var range = document.createRange()
  range.selectNodeContents(node)
  selection.removeAllRanges()
  selection.addRange(range)
  return selection
}

function addCopyButton(containerEl) {
  let copyBtn = document.createElement('div')
  copyBtn.className = 'help'
  copyBtn.textContent = 'Click to Copy'

  let lastEl = containerEl.querySelector('code')

  /**
   * Because the markdown creates pre, p elements we have to do something off for snippets
   * TODO: get snipepts from JS files so we don't have to
   * do this hacky stuff
   */
  if (containerEl.parentElement.classList.contains('snippet')) {
    lastEl = lastEl.querySelector('pre')
  }
  containerEl.appendChild(copyBtn, lastEl)

  copyBtn.addEventListener('click', function(el) {
    const target = el.target
    let highlight = el.target.parentElement.querySelector('code')
    let text = selectText(highlight)
    document.execCommand('copy')
    text.removeAllRanges()
    el.target.innerText = 'Copied to Clipboard'

    setTimeout(() => {
      target.innerText = 'Click to Copy'
    }, 6000)
  })
}

window.addEventListener('DOMContentLoaded', event => {
  let highlightBlocks = document.querySelectorAll('.copy')
  Array.from(highlightBlocks).forEach(element => {
    addCopyButton(element)
  })
})
