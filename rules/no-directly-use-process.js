const utils = require('eslint-plugin-nuxt/lib/utils')

module.exports = {
  meta: {
    docs: {
      description: 'disallow directly access to `process` in Vue component'
    },
    messages: {
      noEnv: 'Unexpected {{name}} in Vue Component.'
    }
  },

  create(context) {
    const forbiddenNodes = []

    return {
      MemberExpression(node) {
        const objectName = node.object.name
        if (objectName === 'process') {
          const propertyName = node.computed
            ? node.property.value
            : node.property.name
          if (propertyName) {
            forbiddenNodes.push({ name: 'process.' + propertyName, node })
          }
        }
      },
      ...utils.executeOnVue(context, (rootNode) => {
        const fileName = context.getFilename()

        // 環境設定用ファイルについては許可する
        if (fileName.includes('plugins/environments')) {
          return
        }

        // Get all methods
        const computed = rootNode.properties.find((p) => p.key.name === 'computed')

        const componentMethods = [
          ...rootNode.properties.filter((property) => {
            return (
              property.value.type === 'ArrowFunctionExpression' ||
              property.value.type === 'FunctionExpression'
            )
          }),
          ...(computed ? computed.value.properties : [])
        ]

        componentMethods.forEach((method) => {
          forbiddenNodes.forEach((forbiddenNode) => {
            if (utils.isInFunction(method, forbiddenNode.node)) {
              context.report({
                node: forbiddenNode.node,
                messageId: 'noEnv',
                data: {
                  name: forbiddenNode.name
                }
              })
            }
          })
        })
      })
    }
  }
}
