class Solution:
    def corpFlightBookings(self, bookings: list[list[int]], n: int) -> list[int]:
        res = [0] * n
        for first, last, seats in bookings:
            res[first - 1] += seats
            if last < n:
                res[last] -= seats
        
        for i in range(1, n):
            res[i] += res[i - 1]
        return res

def test():
    sol = Solution()
    assert sol.corpFlightBookings([[1,2,10],[2,3,20],[2,5,25]], 5) == [10,55,45,25,25], "test 1 failed"
    assert sol.corpFlightBookings([[1,2,10],[2,2,15]], 2) == [10,25], "test 2 failed"
    print("✓ corporate-flight-bookings passed")

if __name__ == "__main__":
    test()
