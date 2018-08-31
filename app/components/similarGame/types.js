export const SimilarGameTypes = (theme) => {
  return ({
    _base: {
      container: {
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'row',
        flex: 1
      },
      section: {
        justifyContent: 'flex-start',
        flexDirection: 'row',
        flex: 1,
      },
      icon: {
        fontSize: 15,
        // padding: 13,
        // marginLeft: 128,
      },
      label: {
        marginLeft: 8,
        alignSelf: 'flex-end'
      }
    },
    leftAligned: {
      section: {
        alignItems: 'flex-start',
        justifyContent: 'flex-start'
      },
      label: {
        color: theme.colors.text.inverse,
      },
      icon: {
        color: theme.colors.text.inverse
      }
    },
    space: {
      container: {
        justifyContent: 'space-between',
        paddingHorizontal: 3
      },
      section: {
        flex: -1
      }
    }
  })
};