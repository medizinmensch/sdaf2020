import { shallowMount } from '@vue/test-utils'
import Entry from "./Entry"


describe('Testing Entry.vue', () => {
  // it('is empty', () => {
  //   const wrapper = shallowMount(Entry)
  //   expect(wrapper.text()).toEqual('')
  // })

  it("Downvote triggers", async () =>  {
    const entry = {
      index: 0,
      votes: 1,
      title: 'IBM splits into two companies'
    }
    const wrapper = shallowMount(Entry, {props: {entry}})
    // await wrapper.setData({
    //   props: {
    //     entry: entry
    //   }
    // })
    // accessibility
    expect(wrapper.text()).toMatch("IBM splits into two companies")
  })
})