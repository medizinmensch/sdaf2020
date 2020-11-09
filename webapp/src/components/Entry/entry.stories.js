import Entry from "./Entry"

export default {
  title: 'Components/Entry',
  component: Entry,
  argTypes: {
    entry: {
      title: { control: "Title" },
      votes: { control: "Amount of Votes" }
    }
  },
};

const Template = (args, { argTypes }) => ({
  props: Object.keys(argTypes),
  components: { Entry },
  template: '<Entry @del-entry="del-entry" @downvote-entry="downvote-entry" @upvote-entry="$upvote-entry" v-bind="$props"/>'
})

export const Example = Template.bind({});
Example.args = {
  entry: {
    id: 2,
    title: "Single entry",
    votes: 2
  }
}