module.exports = {
    meta: {
        type: "problem",
        docs: {
            description: "'JSON.stringify()' must not be used in sql template strings use 'sql.json()' instead"
        },
        schema: [],
        messages: {
            unexpected: "JSON.stringify() is found inside slonik sql template expression use 'sql.json()' instead"
        }
    },
    create: function(context) {
        return {
            'TaggedTemplateExpression[tag.name="sql"] CallExpression': function(node) {
                if (
                    node.callee.object.name === 'JSON' &&
                    node.callee.property.name === 'stringify'
                ) {
                    context.report({ node, messageId: 'unexpected'})
                }
            }
        }
    }
}