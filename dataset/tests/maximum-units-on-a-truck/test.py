class Solution:
    def maximumUnits(self, boxTypes: list[list[int]], truckSize: int) -> int:
        boxTypes.sort(key=lambda x: x[1], reverse=True)
        total_units = 0
        for count, units in boxTypes:
            take = min(truckSize, count)
            total_units += take * units
            truckSize -= take
            if truckSize == 0:
                break
        return total_units

def test():
    sol = Solution()
    assert sol.maximumUnits([[1,3],[2,2],[3,1]], 4) == 8
    assert sol.maximumUnits([[5,10],[2,5],[4,7],[3,9]], 10) == 91

    print("✓ maximum-units-on-a-truck passed")

if __name__ == '__main__':
    test()
