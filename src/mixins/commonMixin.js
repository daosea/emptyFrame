import { getDict } from '@/api/dict'
export default {
  data() {
    return {

    }
  },
  methods: {
    getDicts(list) {
      list.forEach(element => {
        for (const ele in element) {
          getDict({ parentId: ele }).then(response => {
            element[ele] = response.results
          })
        }
      })
    }
  }
}
