import { mount } from '@vue/test-utils'
import Entry from "./Entry"



test("List component downvote", () => {
  const wrapper = mount(Entry, {
    propsData: {
      entry: [
        {
          index: 0,
          votes: 0,
          title: 'IBM splits into two companies'
        }
      ]
    }
  })
  
  wrapper.find('button').trigger("click");
  expect(wrapper.emitted("upvote-entry"))  
})

