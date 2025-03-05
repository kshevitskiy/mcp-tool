# Model-Context-Protocol Tools Collection

**MCP Tools** is a versatile monorepo providing utilities designed to work with the [**Model-Context-Protocol (MCP)**](https://modelcontextprotocol.io/introduction) framework. It offers a modular approach to managing event-driven workflows through different communication channels.

## Overview

The monorepo consists of multiple packages, each implementing specific transport layers for the MCP framework:

- **<TOOL_NAME>-sse**: Server-Sent Events (SSE) implementation, enabling real-time, unidirectional data streams from server to client.
- **<TOOL_NAME>-stdio**: Standard Input/Output (stdio) implementation, facilitating synchronous communication via command-line interfaces.

These packages aim to provide seamless integrations with various clients, making the MCP framework more adaptable to different system architectures.

## Installation

To install the MCP Tools monorepo and its dependencies, follow these steps:

```sh
# clone the repository
git clone git@github.com:kshevitskiy/mcp-tool.git
cd mcp-tool

# install dependencies
pnpm install
```

## Usage

Refer to each package's individual documentation for detailed usage instructions.

## License

This project is licensed under the MIT License. See the [LICENSE](/LICENSE.md) file for details.
