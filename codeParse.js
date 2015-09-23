{
	"type": "Program",
	"start": 0,
	"end": 246,
	"loc": {
		"start": {
			"line": 1,
			"column": 0
		},
		"end": {
			"line": 17,
			"column": 28
		}
	},
	"sourceType": "module",
	"body": [
		{
			"type": "ImportDeclaration",
			"start": 10,
			"end": 33,
			"loc": {
				"start": {
					"line": 2,
					"column": 0
				},
				"end": {
					"line": 2,
					"column": 23
				}
			},
			"specifiers": [
				{
					"type": "ImportDefaultSpecifier",
					"start": 17,
					"end": 18,
					"loc": {
						"start": {
							"line": 2,
							"column": 7
						},
						"end": {
							"line": 2,
							"column": 8
						}
					},
					"local": {
						"type": "Identifier",
						"start": 17,
						"end": 18,
						"loc": {
							"start": {
								"line": 2,
								"column": 7
							},
							"end": {
								"line": 2,
								"column": 8
							}
						},
						"name": "_",
						"leadingComments": null
					},
					"leadingComments": null
				}
			],
			"importKind": "value",
			"source": {
				"type": "Literal",
				"start": 24,
				"end": 32,
				"loc": {
					"start": {
						"line": 2,
						"column": 14
					},
					"end": {
						"line": 2,
						"column": 22
					}
				},
				"value": "lodash",
				"rawValue": "lodash",
				"raw": "'lodash'"
			},
			"leadingComments": [
				{
					"type": "CommentLine",
					"value": "@import",
					"start": 0,
					"end": 9,
					"loc": {
						"start": {
							"line": 1,
							"column": 0
						},
						"end": {
							"line": 1,
							"column": 9
						}
					},
					"range": [
						0,
						9
					]
				}
			]
		},
		{
			"type": "ImportDeclaration",
			"start": 34,
			"end": 54,
			"loc": {
				"start": {
					"line": 3,
					"column": 0
				},
				"end": {
					"line": 3,
					"column": 20
				}
			},
			"specifiers": [
				{
					"type": "ImportDefaultSpecifier",
					"start": 41,
					"end": 42,
					"loc": {
						"start": {
							"line": 3,
							"column": 7
						},
						"end": {
							"line": 3,
							"column": 8
						}
					},
					"local": {
						"type": "Identifier",
						"start": 41,
						"end": 42,
						"loc": {
							"start": {
								"line": 3,
								"column": 7
							},
							"end": {
								"line": 3,
								"column": 8
							}
						},
						"name": "_"
					}
				}
			],
			"importKind": "value",
			"source": {
				"type": "Literal",
				"start": 48,
				"end": 53,
				"loc": {
					"start": {
						"line": 3,
						"column": 14
					},
					"end": {
						"line": 3,
						"column": 19
					}
				},
				"value": "bbb",
				"rawValue": "bbb",
				"raw": "'bbb'"
			}
		},
		{
			"type": "VariableDeclaration",
			"start": 56,
			"end": 206,
			"loc": {
				"start": {
					"line": 5,
					"column": 0
				},
				"end": {
					"line": 14,
					"column": 3
				}
			},
			"declarations": [
				{
					"type": "VariableDeclarator",
					"start": 60,
					"end": 205,
					"loc": {
						"start": {
							"line": 5,
							"column": 4
						},
						"end": {
							"line": 14,
							"column": 2
						}
					},
					"id": {
						"type": "Identifier",
						"start": 60,
						"end": 72,
						"loc": {
							"start": {
								"line": 5,
								"column": 4
							},
							"end": {
								"line": 5,
								"column": 16
							}
						},
						"name": "HelloMessage"
					},
					"init": {
						"type": "CallExpression",
						"start": 75,
						"end": 205,
						"loc": {
							"start": {
								"line": 5,
								"column": 19
							},
							"end": {
								"line": 14,
								"column": 2
							}
						},
						"callee": {
							"type": "MemberExpression",
							"start": 75,
							"end": 92,
							"loc": {
								"start": {
									"line": 5,
									"column": 19
								},
								"end": {
									"line": 5,
									"column": 36
								}
							},
							"object": {
								"type": "Identifier",
								"start": 75,
								"end": 80,
								"loc": {
									"start": {
										"line": 5,
										"column": 19
									},
									"end": {
										"line": 5,
										"column": 24
									}
								},
								"name": "React"
							},
							"property": {
								"type": "Identifier",
								"start": 81,
								"end": 92,
								"loc": {
									"start": {
										"line": 5,
										"column": 25
									},
									"end": {
										"line": 5,
										"column": 36
									}
								},
								"name": "createClass"
							},
							"computed": false
						},
						"arguments": [
							{
								"type": "ObjectExpression",
								"start": 93,
								"end": 204,
								"loc": {
									"start": {
										"line": 5,
										"column": 37
									},
									"end": {
										"line": 14,
										"column": 1
									}
								},
								"properties": [
									{
										"type": "Property",
										"start": 97,
										"end": 202,
										"loc": {
											"start": {
												"line": 6,
												"column": 2
											},
											"end": {
												"line": 13,
												"column": 3
											}
										},
										"method": false,
										"shorthand": false,
										"computed": false,
										"key": {
											"type": "Identifier",
											"start": 97,
											"end": 103,
											"loc": {
												"start": {
													"line": 6,
													"column": 2
												},
												"end": {
													"line": 6,
													"column": 8
												}
											},
											"name": "render"
										},
										"value": {
											"type": "FunctionExpression",
											"start": 105,
											"end": 202,
											"loc": {
												"start": {
													"line": 6,
													"column": 10
												},
												"end": {
													"line": 13,
													"column": 3
												}
											},
											"id": null,
											"generator": false,
											"expression": false,
											"async": false,
											"params": [],
											"body": {
												"type": "BlockStatement",
												"start": 116,
												"end": 202,
												"loc": {
													"start": {
														"line": 6,
														"column": 21
													},
													"end": {
														"line": 13,
														"column": 3
													}
												},
												"body": [
													{
														"type": "ReturnStatement",
														"start": 140,
														"end": 198,
														"loc": {
															"start": {
																"line": 9,
																"column": 4
															},
															"end": {
																"line": 12,
																"column": 13
															}
														},
														"argument": {
															"type": "JSXElement",
															"start": 148,
															"end": 196,
															"loc": {
																"start": {
																	"line": 9,
																	"column": 12
																},
																"end": {
																	"line": 12,
																	"column": 11
																}
															},
															"openingElement": {
																"type": "JSXOpeningElement",
																"start": 148,
																"end": 153,
																"loc": {
																	"start": {
																		"line": 9,
																		"column": 12
																	},
																	"end": {
																		"line": 9,
																		"column": 17
																	}
																},
																"attributes": [],
																"name": {
																	"type": "JSXIdentifier",
																	"start": 149,
																	"end": 152,
																	"loc": {
																		"start": {
																			"line": 9,
																			"column": 13
																		},
																		"end": {
																			"line": 9,
																			"column": 16
																		}
																	},
																	"name": "div",
																	"leadingComments": null
																},
																"selfClosing": false,
																"leadingComments": null
															},
															"closingElement": {
																"type": "JSXClosingElement",
																"start": 190,
																"end": 196,
																"loc": {
																	"start": {
																		"line": 12,
																		"column": 5
																	},
																	"end": {
																		"line": 12,
																		"column": 11
																	}
																},
																"name": {
																	"type": "JSXIdentifier",
																	"start": 192,
																	"end": 195,
																	"loc": {
																		"start": {
																			"line": 12,
																			"column": 7
																		},
																		"end": {
																			"line": 12,
																			"column": 10
																		}
																	},
																	"name": "div"
																}
															},
															"children": [
																{
																	"type": "Literal",
																	"start": 153,
																	"end": 166,
																	"loc": {
																		"start": {
																			"line": 9,
																			"column": 17
																		},
																		"end": {
																			"line": 10,
																			"column": 12
																		}
																	},
																	"value": "\n    \t\tHello ",
																	"rawValue": null,
																	"raw": "\n    \t\tHello "
																},
																{
																	"type": "JSXExpressionContainer",
																	"start": 166,
																	"end": 183,
																	"loc": {
																		"start": {
																			"line": 10,
																			"column": 12
																		},
																		"end": {
																			"line": 10,
																			"column": 29
																		}
																	},
																	"expression": {
																		"type": "MemberExpression",
																		"start": 167,
																		"end": 182,
																		"loc": {
																			"start": {
																				"line": 10,
																				"column": 13
																			},
																			"end": {
																				"line": 10,
																				"column": 28
																			}
																		},
																		"object": {
																			"type": "MemberExpression",
																			"start": 167,
																			"end": 177,
																			"loc": {
																				"start": {
																					"line": 10,
																					"column": 13
																				},
																				"end": {
																					"line": 10,
																					"column": 23
																				}
																			},
																			"object": {
																				"type": "ThisExpression",
																				"start": 167,
																				"end": 171,
																				"loc": {
																					"start": {
																						"line": 10,
																						"column": 13
																					},
																					"end": {
																						"line": 10,
																						"column": 17
																					}
																				}
																			},
																			"property": {
																				"type": "Identifier",
																				"start": 172,
																				"end": 177,
																				"loc": {
																					"start": {
																						"line": 10,
																						"column": 18
																					},
																					"end": {
																						"line": 10,
																						"column": 23
																					}
																				},
																				"name": "props"
																			},
																			"computed": false
																		},
																		"property": {
																			"type": "Identifier",
																			"start": 178,
																			"end": 182,
																			"loc": {
																				"start": {
																					"line": 10,
																					"column": 24
																				},
																				"end": {
																					"line": 10,
																					"column": 28
																				}
																			},
																			"name": "name"
																		},
																		"computed": false
																	}
																},
																{
																	"type": "Literal",
																	"start": 183,
																	"end": 190,
																	"loc": {
																		"start": {
																			"line": 10,
																			"column": 29
																		},
																		"end": {
																			"line": 12,
																			"column": 5
																		}
																	},
																	"value": "\n\n    \t",
																	"rawValue": null,
																	"raw": "\n\n    \t"
																}
															],
															"leadingComments": null,
															"parenthesizedExpression": true
														},
														"leadingComments": [
															{
																"type": "CommentLine",
																"value": "@render ",
																"start": 125,
																"end": 135,
																"loc": {
																	"start": {
																		"line": 8,
																		"column": 3
																	},
																	"end": {
																		"line": 8,
																		"column": 13
																	}
																},
																"range": [
																	125,
																	135
																]
															}
														]
													}
												]
											}
										},
										"kind": "init"
									}
								]
							}
						]
					}
				}
			],
			"kind": "var",
			"trailingComments": [
				{
					"type": "CommentLine",
					"value": "@export",
					"start": 208,
					"end": 217,
					"loc": {
						"start": {
							"line": 16,
							"column": 0
						},
						"end": {
							"line": 16,
							"column": 9
						}
					},
					"range": [
						208,
						217
					]
				}
			]
		},
		{
			"type": "ExportDefaultDeclaration",
			"start": 218,
			"end": 246,
			"loc": {
				"start": {
					"line": 17,
					"column": 0
				},
				"end": {
					"line": 17,
					"column": 28
				}
			},
			"declaration": {
				"type": "Identifier",
				"start": 233,
				"end": 245,
				"loc": {
					"start": {
						"line": 17,
						"column": 15
					},
					"end": {
						"line": 17,
						"column": 27
					}
				},
				"name": "HelloMessage",
				"leadingComments": null
			},
			"leadingComments": [
				{
					"type": "CommentLine",
					"value": "@export",
					"start": 208,
					"end": 217,
					"loc": {
						"start": {
							"line": 16,
							"column": 0
						},
						"end": {
							"line": 16,
							"column": 9
						}
					},
					"range": [
						208,
						217
					]
				}
			]
		}
	]
}