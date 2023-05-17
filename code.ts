// This plugin will open a window to prompt the user to enter a number, and
// it will then create that many rectangles on the screen.

// This file holds the main code for the plugins. It has access to the *document*.
// You can access browser APIs in the <script> tag inside "ui.html" which has a
// full browser environment (see documentation).

// This shows the HTML page in "ui.html".
figma.showUI(__html__);

// Calls to "parent.postMessage" from within the HTML page will trigger this
// callback. The callback will be passed the "pluginMessage" property of the
// posted message.
figma.ui.onmessage = msg => {
  // One way of distinguishing between different types of messages sent from
  // your HTML page is to use an object with a "type" property like this.
  if (msg.type === 'divided') {
    const nodes: SceneNode[] = [];
    for (let i = 0; i < msg.count.max; i++) {
      const rect = figma.createRectangle();
      rect.resizeWithoutConstraints(16, 8)
      rect.x = i * 18;
      if (i == 0) {
        rect.topLeftRadius = 100
        rect.bottomLeftRadius = 100
      }
      if (i == (msg.count.max - 1) ) {
        rect.topRightRadius = 100
        rect.bottomRightRadius = 100
      }
      if (i < msg.count.fill) {
        rect.fills = [{type: 'SOLID', color: {r: 0.188, g: 0.498, b: 0.886}}];
      } else {
        rect.fills = [{type: 'SOLID', color: {r: 0.914, g: 0.914, b: 0.914}}];
      }
      figma.currentPage.appendChild(rect);
      nodes.push(rect);
    }
    figma.currentPage.selection = nodes;
    figma.viewport.scrollAndZoomIntoView(nodes);
  }

  if (msg.type === 'full') {
    const progressBar: SceneNode[] = [];
    const parent = figma.createRectangle();
    parent.resizeWithoutConstraints(((msg.count.max * 100) / msg.count.max), 8)
    parent.cornerRadius = 100
    parent.fills = [{type: 'SOLID', color: {r: 0.914, g: 0.914, b: 0.914}}];

    const child = figma.createRectangle();
    child.resizeWithoutConstraints(((msg.count.fill * 100) / msg.count.max), 8)
    child.cornerRadius = 100
    child.fills = [{type: 'SOLID', color: {r: 0.188, g: 0.498, b: 0.886}}];
    progressBar.push(parent, child);

    figma.currentPage.selection = progressBar;
    figma.viewport.scrollAndZoomIntoView(progressBar);
  }

  // Make sure to close the plugin when you're done. Otherwise the plugin will
  // keep running, which shows the cancel button at the bottom of the screen.
  figma.closePlugin();
};
