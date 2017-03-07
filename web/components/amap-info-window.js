import components from '../service/components';
import vendor from '../service/vendor';

const componentName = 'infoWindow';
// prototype methods.
const proto = {
  create() {
    const node = document.createElement('div');
    const data = this.data.attr;
    const comId = data.ref || vendor.gengerateRandomId(componentName);
    this.addAppendHandler(() => {
      if (data.position && Array.isArray(data.position)) {
        components.registerComponent(componentName, {
          position: data.position,
          offset: data.offset,
          open: data.open
        }, comId, (com, map) => {
          if (data.open) {
            let content = data.content;
            if (this.node.children.length > 0) {
              content = this.node.children[0].innerHTML;
            }
            if (content) {
              com.setContent(content);
              com.open(map, data.position);
            }
          }
        });
      } else {
        console.warn('attribute center must be an array.');
      }
    });
    this._comId = comId;
    return node;
  }
};

const attr = {
  open(val) {
    const com = components.getComponent(this._comId);
    const map = components.getComponentMap();
    if (com) {
      if (val) {
        com.open(map, this.data.attr.position);
      } else {
        com.close();
      }
    }
  }
};

const event = {
};

function init(Weex) {
  const Component = Weex.Component;
  const extend = Weex.utils.extend;

  function AmapInfoWindow(data) {
    Component.call(this, data);
  }
  AmapInfoWindow.prototype = Object.create(Component.prototype);
  extend(AmapInfoWindow.prototype, proto);
  extend(AmapInfoWindow.prototype, { attr });
  extend(AmapInfoWindow.prototype, { event });
  Weex.registerComponent('weex-amap-info-window', AmapInfoWindow);
}

export default { init };
