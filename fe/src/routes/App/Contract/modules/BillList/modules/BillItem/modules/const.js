export const INPUT_OPTIONS = {
  electric: () => {
    return {
      initialValue: 0,
      rules: [
        {
          required: true,
          message: 'Cannot leave this empty'
        }
      ]
    }
  }
}
