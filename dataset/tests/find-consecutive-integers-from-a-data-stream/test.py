from solution import DataStream
ds = DataStream(4, 3)
assert ds.consec(4) == False
assert ds.consec(4) == False
assert ds.consec(4) == True
assert ds.consec(3) == False
print('All tests passed for find-consecutive-integers-from-a-data-stream!')
