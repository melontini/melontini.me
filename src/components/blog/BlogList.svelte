<script lang="ts">
  import { listPosts } from "../../at.agent";
  import { slide } from "svelte/transition";

  let postsPromise = listPosts();

  let gradients = [
    ["#640D5F", "#D91656", "#EB5B00", "#FFB200"],
    ["#D3F1DF", "#85A98F", "#5A6C57"],
    ["#5FCBF4", "#F0A0B2", "#ECECEC", "#F0A0B2", "#5FCBF4"],
    ["#EF248D", "#FBD805", "#4CABE3"],
    ["#048D73", "#A1D7BD", "#F1F0F8", "#7EACDD", "#402B76"],
    ["#FAEE3A", "#FFFFFF", "#8C5EA7", "#010101"],
    ["#010101", "#A2A2A2", "#FFFFFF", "#7C267D"],
    ["#D52D00", "#FF9B55", "#FFFFFF", "#D462A5", "#A30262"],
    ["#00FF9C", "#FEFFA7", "#FFE700"],
    ["#C84793", "#4BB166", "#4288C8"],
    ["#204D9B", "#E52322", "#000000"],
    ["#E30613", "#F18815", "#FFED00", "#028137", "#2E57A4", "#6E2381"],
    ["#FED905", "#67328A"],
    ["#EE75A1", "#FFFFFF", "#8A4493", "#000000", "#374A99"],
    ["#433878", "#7E60BF", "#E4B1F0", "#FFE1FF"],
    ["#347928", "#C0EBA6", "#FFFBE6", "#FCCD2A"],
    ["#FF6600", "#F5F5F5", "#8FD14F", "#604CC3"],
    ["#1A1A1D", "#3B1C32", "#6A1E55", "#A64D79"],
  ];
</script>

<div
  class="loading-container min-h-40 bg-elevation-1 rounded-xl mx-auto mb-5 w-full sm:w-8/12 text-center hovered"
>
  {#await postsPromise}
    <div out:slide|global>
      <div class="p-2">
        <div class="post-banner mb-2"></div>
      </div>
    </div>
  {:then posts}
    {#if posts.length > 0}
      <div in:slide|global>
        <a class="no-underline" href={`/manuscript/${posts[0].rkey}`}>
          <div class="p-2">
            {#if posts[0].record?.ogp?.url}
              <img
                alt=""
                loading="eager"
                decoding="async"
                src={posts[0].record?.ogp?.url}
                class="post-banner mb-2 rounded-xl"
              />
            {:else}
              <div
                style="background: linear-gradient(to right, {gradients[
                  new Date(posts[0].record.createdAt).valueOf() %
                    gradients.length
                ]}); opacity: 65%;"
                class="post-banner mb-2 rounded-xl"
              ></div>
            {/if}
          </div>

          <h4 class="m-0 px-2 text-2xl sm:text-3xl lg:text-4xl">
            {posts[0].record.title}
          </h4>

          <p class="">
            <time datetime={new Date(posts[0].record.createdAt).toISOString()}>
              {new Date(posts[0].record.createdAt).toLocaleDateString("en-us", {
                year: "numeric",
                month: "short",
                day: "numeric",
              })}
            </time>
          </p>
        </a>
      </div>
    {/if}
  {:catch err}
    <div class="p-2">
      <div style="aspect-ratio: 5/2;" class="mb-2">
        <h4 class="text-6xl">⚠️</h4>
        <p>{err}</p>
      </div>
    </div>
  {/await}
</div>

<hr class="my-10" />

<section>
  <ul class="grid sm:grid-cols-2 gap-2 m-0 p-0 md:gap-8">
    {#await postsPromise}
      {#each [0, 0, 0, 0] as _}
        <li out:slide|global class=" loading-container bg-elevation-1 rounded-xl">
          <div class="post-banner mb-2"></div>
        </li>
      {/each}
    {:then posts}
      {#each posts.slice(1) as post}
        <li
          in:slide|global
          class="bg-elevation-1 rounded-xl text-center hovered"
        >
          <a href={`/manuscript/${post.rkey}/`} class="block pb-3 no-underline">
            <div class="p-2 pb-0">
              {#if post.record?.ogp?.url}
                <img
                  alt=""
                  loading="lazy"
                  decoding="async"
                  src={post.record?.ogp?.url}
                  class="post-banner mb-2 rounded-xl"
                />
              {:else}
                <div
                  style="background: linear-gradient(to right, {gradients[
                    new Date(post.record.createdAt).valueOf() % gradients.length
                  ]}); opacity: 65%;"
                  class="post-banner mb-2 rounded-xl"
                ></div>
              {/if}
            </div>

            <h4 class="m-0 pt-2 px-2 line leading-none">
              {post.title}
            </h4>

            <p class="m-0">
              <time datetime={new Date(post.record.createdAt).toISOString()}>
                {new Date(post.record.createdAt).toLocaleDateString("en-us", {
                  year: "numeric",
                  month: "short",
                  day: "numeric",
                })}
              </time>
            </p>
          </a>
        </li>
      {/each}
    {/await}
  </ul>
</section>

{#await postsPromise}
  <style>
    .loading-container {
      @apply animate-pulse;
    }
  </style>
{/await}

<style>
  .post-banner {
    aspect-ratio: 2/1;
  }
</style>
