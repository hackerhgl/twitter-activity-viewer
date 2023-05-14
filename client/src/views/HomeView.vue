<script setup lang="ts">
import TweetCard from "@/components/TweetCard.vue"
import TweetsSortFilter from "@/components/TweetsSortFilter.vue"
import UsersSortFilter from "@/components/UsersSortFilter.vue"
import AppHeader from "@/components/AppHeader.vue"
import users from "@/assets/users.json"
import type { TwitterUser } from "@/types/user"
import { useTwitterStore } from "../stores/twitter"

function getUser(userId: string) {
	const user = (users as any)[userId]
	return user as TwitterUser
}

const twitterStore = useTwitterStore()

function click20Tweets() {
	const items = document.getElementsByClassName("visited-button")
	const sliced = Array.prototype.slice.call(items, 0, 20)
	sliced.forEach((item, index) => {
		setTimeout(() => {
			item.click()
		}, index * 100)
	})
}
</script>

<template>
	<div class="px-6">
		<AppHeader />
		<!-- <div class="mx-auto md:max-w-3xl px-4 sm:px-6 lg:px-0"> -->
		<UsersSortFilter />
		<div class="my-4" />
		<TweetsSortFilter />
		<div class="my-4" />
		<div>Total tweets: {{ twitterStore.filtered.length }}</div>
		<div class="flex flex-row flex-wrap">
			<template
				v-for="tweet in twitterStore.filtered"
				:key="tweet.id_str"
			>
				<TweetCard :tweet="tweet" :user="getUser(tweet.user)" />
			</template>
		</div>

		<div
			@click="click20Tweets"
			class="fixed bottom-5 right-4 border px-5 py-3 rounded-md bg-zinc-800 cursor-pointer"
		>
			Click 20
		</div>
	</div>
</template>
