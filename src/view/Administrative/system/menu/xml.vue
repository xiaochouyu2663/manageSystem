<template>

</template>
<script>
    import http from 'assets/js/http'
    export default {
        data() {
            return {
                fileList: []
            };
        },
        methods: {
            handleRemove(file, fileList) {
                console.log(file, fileList);
            },
            handlePreview(file) {
                console.log(file);
            },
            uploadSuccess(data) {
                this.apiGet('admin/menus/parseXml').then((res) => {
                    this.handelResponse(res, (data) => {
                        alert(1)
                    })
                })
			}
        }
    }
</script>