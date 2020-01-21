<template>
    <Row :gutter="16">
        <Col span="6">
            <div>
                <Upload action="//jsonplaceholder.typicode.com/posts/">
                    <Button icon="ios-cloud-upload-outline">上传文件</Button>
                </Upload>
            </div>
        </Col>
        <Col span="6">
            <div>
                <Upload action="//jsonplaceholder.typicode.com/posts/">
                    <Button icon="ios-cloud-upload-outline">上传文件2</Button>
                </Upload>
            </div>
        </Col>
    </Row>
</template>
<script>
    export default {
        
    }
</script>