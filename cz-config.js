'use strict';
module.exports = {
    types: [
        { value: 'feat', name: '新增:    新的内容' },
        { value: 'fix', name: '修复:    修复一个Bug' },
        { value: 'docs', name: '文档:    变更的只有文档' },
        { value: 'style', name: '格式:    空格, 分号等格式修复' },
        { value: 'refactor', name: '重构:    代码重构，注意和特性、修复区分开' },
        { value: 'perf', name: '性能:    提升性能' },
        { value: 'test', name: '测试:    添加一个测试' },
        { value: 'chore', name: '工具:    开发工具变动(构建、脚手架工具等)' },
        { value: 'revert', name: '回滚:    代码回退' },
    ],
    messages: {
        type: '选择一种你的提交类型:',
        customScope: '请输入修改范围(可选):',
        subject: '请简要描述提交(必填):\n',
        body: '请输入详细描述(可选):\n',
        breaking: '非兼容性说明 (可选):\n',
        footer: '关联关闭的issue，例如：#31, #34(可选):\n',
        confirmCommit: '确定提交说明?(y/n/e/h)',
    },
    // 跳过问题
    skipQuestions: ['customScope', 'breaking'],
    // subject文字长度默认是72
    subjectLimit: 100,
};
