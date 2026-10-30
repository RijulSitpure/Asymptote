class Solution:
    def mostPopularCreator(self, creators: list[str], ids: list[str], views: list[int]) -> list[list[str]]:
        total_views = {}
        best_video = {}
        for c, vid, v in zip(creators, ids, views):
            total_views[c] = total_views.get(c, 0) + v
            if c not in best_video:
                best_video[c] = (v, vid)
            else:
                cur_v, cur_vid = best_video[c]
                if v > cur_v or (v == cur_v and vid < cur_vid):
                    best_video[c] = (v, vid)
        max_views = max(total_views.values())
        ans = []
        for c, tot in total_views.items():
            if tot == max_views:
                ans.append([c, best_video[c][1]])
        return ans
