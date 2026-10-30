from solution import FrequencyTracker
ft = FrequencyTracker()
ft.add(3)
ft.add(3)
assert ft.hasFrequency(2) is True
ft.deleteOne(3)
assert ft.hasFrequency(2) is False
assert ft.hasFrequency(1) is True
print('All tests passed for frequency-tracker!')
