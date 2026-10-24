class Solution:
    def sampleStats(self, count: list[int]) -> list[float]:
        total = sum(count)
        min_val = -1.0
        max_val = -1.0
        sum_val = 0
        mode_val = 0.0
        max_freq = 0
        
        for i, c in enumerate(count):
            if c > 0:
                if min_val == -1.0:
                    min_val = float(i)
                max_val = float(i)
                sum_val += i * c
                if c > max_freq:
                    max_freq = c
                    mode_val = float(i)
        
        mean_val = sum_val / total
        target1 = (total + 1) // 2
        target2 = (total + 2) // 2
        med1, med2 = None, None
        cur = 0
        for i, c in enumerate(count):
            cur += c
            if med1 is None and cur >= target1:
                med1 = i
            if med2 is None and cur >= target2:
                med2 = i
                break
        median_val = (med1 + med2) / 2.0
        return [min_val, max_val, mean_val, median_val, mode_val]

def test():
    sol = Solution()
    arr1 = [0] * 256
    arr1[1] = 1; arr1[2] = 3; arr1[3] = 4
    res1 = sol.sampleStats(arr1)
    assert res1 == [1.0, 3.0, 2.375, 2.5, 3.0], f"test 1 failed: {res1}"
    arr2 = [0] * 256
    arr2[0] = 4; arr2[4] = 1
    res2 = sol.sampleStats(arr2)
    assert res2 == [0.0, 4.0, 0.8, 0.0, 0.0], f"test 2 failed: {res2}"
    print("✓ statistics-from-a-large-sample passed")

if __name__ == "__main__":
    test()
