import React, { Component } from "react";

class MicroFrontend extends Component {
  componentDidMount() {
    const { name, host, document } = this.props;
    const scriptId = `micro-frontend-script-${name}`;

    if (document.getElementById(scriptId)) {
      this.renderMicroFrontend();
      return;
    }

    fetch(`${host}/asset-manifest.json`)
      .then(res => res.json())
      .then(manifest => {
        const script = document.createElement("script");
        script.id = scriptId;
        script.crossOrigin = "";
        console.log(manifest.files['main.js'])
        console.log(manifest)
        console.log(manifest.entrypoints[0])
        console.log(this.props.history)
        script.src = `${host}/${manifest.entrypoints[0]}`;
        script.onload = this.renderMicroFrontend;
        document.head.appendChild(script);
        console.log(document.head)
      });
  }

  componentWillUnmount() {
    const { name, window } = this.props;
    window[`unmount${name}`](`${name}-container`);
  }

  renderMicroFrontend = () => {
    const { name, window, history } = this.props;
    // console.log(window[`render${name}]`)
    console.log(`renderBrowse`)
    window[`render${name}`](`${name}-container`, history);
  };

  render() {
    return <main id={`${this.props.name}-container`} />;
  }
}

MicroFrontend.defaultProps = {
  document,
  window
};

export default MicroFrontend;
