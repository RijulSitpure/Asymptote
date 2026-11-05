class Solution:
    def sortByReflection(self, nums: list[int]) -> list[int]:
        def reflect(x: int) -> int:
            b = bin(x)[2:]
            return int(b[::-1], 2)
        
        return sorted(nums, key=lambda x: (reflect(x), x))

def run_tests():
    sol = Solution()
    # 4 -> bin '100' -> rev '001' -> 1
    # 2 -> bin '10' -> rev '01' -> 1
    # 1 -> bin '1' -> rev '1' -> 1
    # Tied reflection 1: sorted by original value (1, 2, 4)
    assert sol.sortByReflection([4, 2, 1]) == [1, 2, 4]
    # 3 -> '11' -> rev '11' -> 3
    assert sol.sortByReflection([1, 2, 3]) == [1, 2, 3]
    print("All tests passed for 3769.")

if __name__ == "__main__":
    run_tests()
