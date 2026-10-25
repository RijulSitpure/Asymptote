class Solution:
    def canFormArray(self, arr: list[int], pieces: list[list[int]]) -> bool:
        piece_map = {p[0]: p for p in pieces}
        i = 0
        n = len(arr)
        while i < n:
            if arr[i] not in piece_map:
                return False
            piece = piece_map[arr[i]]
            for x in piece:
                if i >= n or arr[i] != x:
                    return False
                i += 1
        return True

def test():
    sol = Solution()
    assert sol.canFormArray([15,88], [[88],[15]]) == True
    assert sol.canFormArray([49,18,16], [[16,18,49]]) == False
    assert sol.canFormArray([91,4,64,78], [[78],[4,64],[91]]) == True

    print("✓ check-array-formation-through-concatenation passed")

if __name__ == '__main__':
    test()
