class Solution:
    def averageWaitingTime(self, customers: list[list[int]]) -> float:
        curr_time = 0
        total_wait = 0
        for arrival, time in customers:
            curr_time = max(curr_time, arrival) + time
            total_wait += curr_time - arrival
        return total_wait / len(customers)

def test():
    sol = Solution()
    assert abs(sol.averageWaitingTime([[1,2],[2,5],[4,3]]) - 5.0) < 1e-5
    assert abs(sol.averageWaitingTime([[5,2],[5,4],[10,3],[20,1]]) - 3.25) < 1e-5

    print("✓ average-waiting-time passed")

if __name__ == '__main__':
    test()
