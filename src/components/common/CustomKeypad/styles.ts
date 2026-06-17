import { StyleSheet } from 'react-native'
import { verticalScale, moderateScale } from '../../../utils/responsive'

export const styles = StyleSheet.create({
  container: {
    backgroundColor: '#E3E5EA',
    borderTopLeftRadius: 28,
    borderTopRightRadius: 28,
    padding: 16,
    paddingBottom: 24,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 8,
    marginBottom: 8,
  },
  button: {
    flex: 1,
    height: verticalScale(52),
    borderRadius: 12,
    backgroundColor: '#FFFFFF',
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonText: {
    fontFamily: 'Poppins_500Medium',
    fontSize: moderateScale(18),
    color: '#1F1F1F',
  },
  deleteButton: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  spacerSlot: {
    flex: 1,
  },
})