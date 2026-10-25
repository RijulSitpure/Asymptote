class Solution:
    def minAvailableDuration(self, slots1: list[list[int]], slots2: list[list[int]], duration: int) -> list[int]:
        slots1.sort(key=lambda x: x[0])
        slots2.sort(key=lambda x: x[0])
        i = j = 0
        n1, n2 = len(slots1), len(slots2)
        while i < n1 and j < n2:
            start = max(slots1[i][0], slots2[j][0])
            end = min(slots1[i][1], slots2[j][1])
            if end - start >= duration:
                return [start, start + duration]
            if slots1[i][1] < slots2[j][1]:
                i += 1
            else:
                j += 1
        return []

def test():
    sol = Solution()
    s1 = [[10,50],[60,120],[140,210]]
    s2 = [[0,15],[60,70]]
    assert sol.minAvailableDuration(s1, s2, 8) == [60, 68], "test 1 failed"
    s3 = [[10,50],[60,120],[140,210]]
    s4 = [[0,15],[60,70]]
    assert sol.minAvailableDuration(s3, s4, 12) == [], "test 2 failed"
    print("✓ meeting-scheduler passed")

if __name__ == "__main__":
    test()
