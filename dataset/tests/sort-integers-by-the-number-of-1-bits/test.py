class Solution:
    def sortByBits(self, arr: list[int]) -> list[int]:
        return sorted(arr, key=lambda x: (x.bit_count(), x))

def test():
    sol = Solution()
    assert sol.sortByBits([0,1,2,3,4,5,6,7,8]) == [0,1,2,4,8,3,5,6,7], "test 1 failed"
    assert sol.sortByBits([1024,512,256,128,64,32,16,8,4,2,1]) == [1,2,4,8,16,32,64,128,256,512,1024], "test 2 failed"
    print("✓ sort-integers-by-the-number-of-1-bits passed")

if __name__ == "__main__":
    test()
