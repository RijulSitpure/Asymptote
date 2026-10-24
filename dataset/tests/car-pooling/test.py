class Solution:
    def carPooling(self, trips: list[list[int]], capacity: int) -> bool:
        stops = [0] * 1001
        for num, start, end in trips:
            stops[start] += num
            stops[end] -= num
        
        curr = 0
        for passengers in stops:
            curr += passengers
            if curr > capacity:
                return False
        return True

def test():
    sol = Solution()
    assert sol.carPooling([[2,1,5],[3,3,7]], 4) is False, "test 1 failed"
    assert sol.carPooling([[2,1,5],[3,3,7]], 5) is True, "test 2 failed"
    print("✓ car-pooling passed")

if __name__ == "__main__":
    test()
