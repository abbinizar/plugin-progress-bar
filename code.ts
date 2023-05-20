figma.showUI(__html__ , { themeColors: true });

interface IMsg {
  count: {
    fill: number;
    max: number
  }
  type: string
}
figma.ui.onmessage = ( msg:IMsg )=> {
  if (msg.type === 'cancel') {
    figma.closePlugin()
  } else if (msg.count.fill < 1 || msg.count.max < 1) {
    figma.closePlugin("Please open and try again, ensuring that the minimum value of each input is 1.")
  } else {
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
      parent.resizeWithoutConstraints(((msg.count.max * 360) / msg.count.max), 8)
      parent.cornerRadius = 100
      parent.fills = [{type: 'SOLID', color: {r: 0.914, g: 0.914, b: 0.914}}];

      const child = figma.createRectangle();
      child.resizeWithoutConstraints(((msg.count.fill * 360) / msg.count.max), 8)
      child.cornerRadius = 100
      child.fills = [{type: 'SOLID', color: {r: 0.188, g: 0.498, b: 0.886}}];
      progressBar.push(parent, child);

      figma.currentPage.selection = progressBar;
      figma.viewport.scrollAndZoomIntoView(progressBar);
    }
    figma.closePlugin('Progres Bar is now complete.');
  }
};
