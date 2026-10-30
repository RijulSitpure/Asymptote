from solution import BookMyShow
b = BookMyShow(2, 5)
assert b.gather(4, 0) == [0, 0]
assert b.gather(2, 0) == []
assert b.scatter(5, 1) == True
assert b.scatter(5, 1) == False
print("All tests passed for booking-concert-tickets-in-groups!")
