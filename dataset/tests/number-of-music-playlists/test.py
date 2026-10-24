class Solution:
    def numMusicPlaylists(self, n: int, goal: int, k: int) -> int:
        MOD = 1_000_000_007
        dp = [0] * (n + 1)
        dp[0] = 1
        for i in range(1, goal + 1):
            nxt = [0] * (n + 1)
            for j in range(1, min(i, n) + 1):
                new_song = dp[j - 1] * (n - j + 1)
                old_song = dp[j] * max(0, j - k)
                nxt[j] = (new_song + old_song) % MOD
            dp = nxt
        return dp[n]

def test():
    sol = Solution()
    assert sol.numMusicPlaylists(3, 3, 1) == 6, "test 1 failed"
    assert sol.numMusicPlaylists(2, 3, 0) == 6, "test 2 failed"
    assert sol.numMusicPlaylists(2, 3, 1) == 2, "test 3 failed"
    print("✓ number-of-music-playlists passed")

if __name__ == "__main__":
    test()
