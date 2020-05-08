A JupyterLab extension for rendering 3D scenes generated using [Crystal Toolkit](https://crystaltoolkit.org).

Thanks to [jupyterlab-mp4](https://github.com/jupyterlab/jupyterlab-mp4) for extension structure.

## Prerequisites

* JupyterLab 1.0 or later

## Installation

```bash
jupyter labextension install ...
```

## Development

For a development install (requires npm version 4 or later), do the following in the repository directory:

```bash
npm install
jupyter labextension link .
```

To rebuild the package and the JupyterLab app:

```bash
npm run build
jupyter lab build
```

