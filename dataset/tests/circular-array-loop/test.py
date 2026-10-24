from typing import List

class Solution:
    def circularArrayLoop(self, nums: List[int]) -> bool:
        n = len(nums)

        def get_next(i: int) -> int:
            return (i + nums[i]) % n

        for i in range(n):
            if nums[i] == 0:
                continue
            slow = i
            fast = get_next(i)
            direction = nums[i] > 0

            while nums[fast] != 0 and (nums[fast] > 0) == direction and (nums[get_next(fast)] > 0) == direction:
                if slow == fast:
                    if slow == get_next(slow):
                        break
                    return True
                slow = get_next(slow)
                fast = get_next(get_next(fast))

            curr = i
            while nums[curr] != 0 and (nums[curr] > 0) == direction:
                nxt = get_next(curr)
                nums[curr] = 0
                curr = nxt

        return False

def test():
    sol = Solution()
    assert sol.circularArrayLoop([2,-1,1,2,2]) == True, "test 1 failed"
    assert sol.circularArrayLoop([-1,-2,-3,-4,-5,6]) == False, "test 2 failed"
    assert sol.circularArrayLoop([1,-1,5,1,4]) == True, "test 3 failed"
    print("✓ circular-array-loop passed")

if __name__ == "__main__":
    test()
