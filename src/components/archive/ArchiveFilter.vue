<template>
  <div class="filter-wrapper">
    <Section name="Filter">
      <div class="filter">
        <div class="filter__item">
          <span class="filter__item__label">Date</span>
          <div class="selector-group">
            <Selector :options="months" v-model="selectedMonth" default-value="Select Month" />
            <Selector :options="years" v-model="selectedYear" default-value="Select Year" />
          </div>
        </div>
        <div class="filter__item">
          <span class="filter__item__label">Author</span>
          <Selector :options="authors" v-model="selectedAuthor" default-value="Select Author" />
        </div>
        <div class="filter__item">
          <span class="filter__item__label">Tags</span>
          <TagSelector @tags-selected="tagSelected" />
        </div>
      </div>
    </Section>
  </div>
</template>

<script lang="ts">
import {Component, Vue, Watch} from "vue-property-decorator";
import Selector from "@/components/reusable/Selector.vue";
import ArchiveFilterInterface from "@/interfaces/archive-filter.interface";
import TagSelector from "@/components/reusable/TagSelector.vue";
import Section from "@/components/reusable/Section.vue";

@Component({
  components: {Section, TagSelector, Selector}
})
export default class ArchiveFilter extends Vue {
  private months = ['January', 'February', 'March', 'April', 'May', 'June', 'July',
    'August', 'September', 'October', 'November', 'December'];
  private years: string[] = [];
  private authors: string[] = [];

  private selectedMonth: null | string = null;
  private selectedYear: null | string = null;
  private selectedAuthor: null | string = null;
  private tags: string[] = [];

  async created() {
    this.years = this.getYears();
    this.authors = await this.getAuthors();
  }

  /**
   * Returns all the years that can be selected.
   */
  getYears(): string[] {
    const range = (lower: number, upper: number): number[] => {
      return Array.from(new Array(upper + 1 - lower), (x, i) => i + lower);
    }
    const INITIAL_YEAR = 2019;
    const currentYear = new Date().getFullYear();
    return range(INITIAL_YEAR, currentYear).map(n => n.toString());
  }

  /**
   * Generates a filter matching the current criteria.
   */
  emitFilter(): void {
    const res = {} as ArchiveFilterInterface;
    if (this.selectedYear) {
      const mo = this.selectedMonth ? this.months.findIndex(m => m === this.selectedMonth) : null;
      res.dateRange = this.$date.getBounds(Number.parseInt(this.selectedYear), mo);
    }
    if (this.selectedAuthor) {
      res.author = this.selectedAuthor;
    }
    if (this.tags.length > 0) {
      res.tags = this.tags;
    }
    console.log(res);
    this.$emit('filter', res);
  }

  /**
   * Gets authors to pick from.
   */
  async getAuthors(): Promise<string[]> {
    const { OK, data, error } = await this.$api.users.getAllUsers();
    if (OK) {
      return data.map(author => author.name);
    } else {
      console.log(error);
      await this.$store.dispatch('error', "An error occurred loading authors");
      return [];
    }
  }

  /**
   * Called when the selected tags is changed.
   * @param tags new tags array
   */
  tagSelected(tags: string[]) {
    this.tags = tags;
    this.emitFilter();
  }

  @Watch('selectedMonth')
  @Watch('selectedYear')
  @Watch('selectedAuthor')
  filterChanged() {
    this.emitFilter();
  }
}
</script>
