{
    "type": "Program",
    "body": [
        {
            "type": "FunctionDeclaration",
            "id": {
                "type": "Identifier",
                "name": "doit"
            },
            "params": [],
            "defaults": [],
            "body": {
                "type": "BlockStatement",
                "body": [
                    {
                        "type": "ExpressionStatement",
                        "expression": {
                            "type": "CallExpression",
                            "callee": {
                                "type": "MemberExpression",
                                "computed": false,
                                "object": {
                                    "type": "Identifier",
                                    "name": "console"
                                },
                                "property": {
                                    "type": "Identifier",
                                    "name": "log"
                                }
                            },
                            "arguments": [
                                {
                                    "type": "Literal",
                                    "value": "in function",
                                    "raw": "'in function'"
                                }
                            ]
                        }
                    },
                    {
                        "type": "TryStatement",
                        "block": {
                            "type": "BlockStatement",
                            "body": [
                                {
                                    "type": "ExpressionStatement",
                                    "expression": {
                                        "type": "CallExpression",
                                        "callee": {
                                            "type": "MemberExpression",
                                            "computed": false,
                                            "object": {
                                                "type": "Identifier",
                                                "name": "console"
                                            },
                                            "property": {
                                                "type": "Identifier",
                                                "name": "log"
                                            }
                                        },
                                        "arguments": [
                                            {
                                                "type": "Literal",
                                                "value": "in try",
                                                "raw": "'in try'"
                                            }
                                        ]
                                    }
                                }
                            ]
                        },
                        "guardedHandlers": [],
                        "handlers": [
                            {
                                "type": "CatchClause",
                                "param": {
                                    "type": "Identifier",
                                    "name": "e"
                                },
                                "body": {
                                    "type": "BlockStatement",
                                    "body": [
                                        {
                                            "type": "ExpressionStatement",
                                            "expression": {
                                                "type": "CallExpression",
                                                "callee": {
                                                    "type": "MemberExpression",
                                                    "computed": false,
                                                    "object": {
                                                        "type": "Identifier",
                                                        "name": "console"
                                                    },
                                                    "property": {
                                                        "type": "Identifier",
                                                        "name": "log"
                                                    }
                                                },
                                                "arguments": [
                                                    {
                                                        "type": "Identifier",
                                                        "name": "e"
                                                    }
                                                ]
                                            }
                                        }
                                    ]
                                }
                            }
                        ],
                        "handler": {
                            "type": "CatchClause",
                            "param": {
                                "type": "Identifier",
                                "name": "e"
                            },
                            "body": {
                                "type": "BlockStatement",
                                "body": [
                                    {
                                        "type": "ExpressionStatement",
                                        "expression": {
                                            "type": "CallExpression",
                                            "callee": {
                                                "type": "MemberExpression",
                                                "computed": false,
                                                "object": {
                                                    "type": "Identifier",
                                                    "name": "console"
                                                },
                                                "property": {
                                                    "type": "Identifier",
                                                    "name": "log"
                                                }
                                            },
                                            "arguments": [
                                                {
                                                    "type": "Identifier",
                                                    "name": "e"
                                                }
                                            ]
                                        }
                                    }
                                ]
                            }
                        },
                        "finalizer": null
                    }
                ]
            },
            "generator": false,
            "expression": false
        },
        {
            "type": "EmptyStatement"
        }
    ]
}