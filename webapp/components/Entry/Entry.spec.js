import { shallowMount } from '@vue/test-utils'
import Entry from "./Entry"


describe('Testing Entry.vue', () => {

  test("Downvote triggers", () => {
    const entry = {
      index: 0,
      votes: 1,
      title: 'IBM splits into two companies'
    }
    const wrapper = shallowMount(Entry, {
      propsData: {
        entry
      }
    })
    accessibility
    expect(wrapper.text()).toMatch("IBM splits into two companies")
  })
})