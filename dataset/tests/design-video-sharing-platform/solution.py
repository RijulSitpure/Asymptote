from typing import List, Optional, Tuple, Dict, Set

import heapq

class VideoSharingPlatform:
    def __init__(self):
        self.reused = []
        self.next_id = 0
        self.videos = {}

    def upload(self, video: str) -> int:
        if self.reused:
            vid = heapq.heappop(self.reused)
        else:
            vid = self.next_id
            self.next_id += 1
        self.videos[vid] = {"content": video, "views": 0, "likes": 0, "dislikes": 0}
        return vid

    def remove(self, videoId: int) -> None:
        if videoId in self.videos:
            del self.videos[videoId]
            heapq.heappush(self.reused, videoId)

    def watch(self, videoId: int, startMinute: int, endMinute: int) -> str:
        if videoId not in self.videos:
            return "-1"
        rec = self.videos[videoId]
        rec["views"] += 1
        return rec["content"][startMinute:endMinute + 1]

    def like(self, videoId: int) -> None:
        if videoId in self.videos:
            self.videos[videoId]["likes"] += 1

    def dislike(self, videoId: int) -> None:
        if videoId in self.videos:
            self.videos[videoId]["dislikes"] += 1

    def getLikesAndDislikes(self, videoId: int) -> list[int]:
        if videoId not in self.videos:
            return [-1]
        rec = self.videos[videoId]
        return [rec["likes"], rec["dislikes"]]

    def getViews(self, videoId: int) -> int:
        if videoId not in self.videos:
            return -1
        return self.videos[videoId]["views"]
