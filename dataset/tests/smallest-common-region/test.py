class Solution:
    def findSmallestRegion(self, regions: list[list[str]], region1: str, region2: str) -> str:
        parent = {}
        for r in regions:
            p = r[0]
            for child in r[1:]:
                parent[child] = p
                
        ancestors = set()
        curr = region1
        while curr:
            ancestors.add(curr)
            curr = parent.get(curr)
            
        curr = region2
        while curr not in ancestors:
            curr = parent[curr]
            
        return curr

def test():
    sol = Solution()
    r = [
        ["Earth","North America","South America"],
        ["North America","United States","Canada"],
        ["United States","New York","Boston"],
        ["Canada","Ontario","Quebec"],
        ["South America","Brazil"]
    ]
    assert sol.findSmallestRegion(r, "Quebec", "New York") == "North America", "test 1 failed"
    print("✓ smallest-common-region passed")

if __name__ == "__main__":
    test()
