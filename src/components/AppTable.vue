<script setup lang="ts"></script>

<template>
  <main class="table-container">
    <table>
      <thead>
        <slot name="thead" />
      </thead>
      <tbody>
        <slot name="tbody" />
      </tbody>
    </table>
  </main>
</template>

<style lang="scss">
.table-container {
  display: flex;
  width: 100%;
  padding: vw(20);
  padding-top: vw(10);
  align-items: flex-start;
  gap: vw(20);
  justify-content: flex-start;
  flex: 1;

  @media (max-width: 991px) {
    padding: 0;
    background-color: var(--color-gray-100);
  }
}

table {
  border-collapse: separate;
  border-radius: vw(10);
  min-width: vw(240);
  border-spacing: 0 vw(10);
  table-layout: auto; // или fixed, если хочешь равномерность

  font-size: vw(15);
  color: var(--color-black);
  font-weight: 500;

  @media (max-width: 991px) {
    border-spacing: 0 vw(10, $mobile);
    font-size: vw(16, $mobile);
  }
}

thead {
  width: 100%;
  font-size: vw(15);
  color: var(--color-black);
  font-weight: 500;
  white-space: nowrap;
  line-height: 1;
  height: vw(38);

  @media (max-width: 991px) {
    display: none;
  }

  tr {
    text-align: start;
    border: vw(1) solid var(--color-gray-3);
    height: vw(38);

    th {
      background-color: var(--color-gray-2);
      border: vw(1) solid var(--color-gray-3);
      border-bottom-color: var(--color-gray-3);
      padding: vw(9) vw(10);

      &:first-child {
        border-left-color: var(--color-gray-3);
      }

      &:last-child {
        border-right-color: var(--color-gray-3);
      }

      div {
        font-weight: 600;
      }
    }

    /* Скругляем углы: первая и последняя ячейка */
    th:first-child {
      border-top-left-radius: vw(10);
      border-bottom-left-radius: vw(10);
    }

    th:last-child {
      border-top-right-radius: vw(10);
      border-bottom-right-radius: vw(10);
    }
  }

  th:not(:first-child) {
    border-left: vw(1) solid var(--color-gray-400);
  }

  th > * {
    align-self: stretch;
    width: 100%;
    gap: vw(10);
  }

  th {
    &.table-cell--id,
    &.table-cell--active,
    &.table-cell--top,
    &.table-cell--user {
      text-align: center;
    }
  }
}

tbody {
  margin-top: 0;
  width: 100%;

  tr {
    border-radius: vw(20);
    padding: vw(10);
    align-items: stretch;
    margin-top: vw(10);
    cursor: pointer;

    @media (max-width: 991px) {
      background-color: var(--color-white);
      margin-top: vw(10, $mobile);
      display: flex;
      flex-direction: column;
      width: 100%;
      position: relative;
      height: auto;
      min-height: vw(155, $mobile);
      padding: vw(15, $mobile) vw(20, $mobile);
      padding-top: vw(45, $mobile);
      padding-bottom: vw(75, $mobile);
      border: none;
      border-radius: vw(16, $mobile);
    }

    td {
      background-color: var(--color-white);
      border: vw(1) solid transparent;
      box-sizing: border-box;

      * {
        margin: vw(10);
        gap: vw(10);
      }
    }

    td:first-child {
      border-top-left-radius: vw(20);
      border-bottom-left-radius: vw(20);
    }

    td:last-child {
      border-top-right-radius: vw(20);
      border-bottom-right-radius: vw(20);
    }
  }

  .sub-header {
    all: unset;
    display: table-row;
    color: var(--color-sub-header);
    font-weight: 500;
    font-size: vw(18);
    line-height: vw(20);
    vertical-align: bottom;
  }

  .sub-header {
    margin: 0;
    height: vw(23) !important;

    @media (max-width: 991px) {
      height: vw(20, $mobile) !important;
      min-height: vw(23, $mobile) !important;
      padding: 0 !important;
      margin-top: 0;
    }
  }

  .sub-header-cell {
    background-color: transparent;
    position: relative;
    overflow: visible;
    width: vw(110);
    height: 0;
    margin: 0;

    div {
      top: vw(-10);
      left: 0;
      width: vw(300);
      margin: 0;
      font-size: vw(15);
      font-weight: 500;
      line-height: vw(20);

      @media (max-width: 991px) {
        font-size: vw(15, $mobile);
        line-height: vw(20, $mobile);
        top: 0;
        width: vw(300, $mobile);
      }
    }
  }
}

tr {
  box-shadow: 0 vw(5) vw(15) 0 rgba(0, 0, 0, 0.05);
  border-radius: vw(10);
  width: 100%;
  min-height: vw(60);
  height: vw(60);
  align-items: flex-start;
  justify-content: flex-start;
}

td {
  border-left: vw(1) solid var(--color-gray-100);
  flex-direction: column;
  align-items: stretch;
  justify-content: center;
}

@media (max-width: 991px) {
  thead {
    display: none;
  }
}

tr.is-warning {
  border: vw(1) solid var(--color-warning-border);

  @media (max-width: 991px) {
    background-color: var(--color-warning);
  }

  td {
    background-color: var(--color-warning);
    border-top-color: var(--color-warning-border);
    border-bottom-color: var(--color-warning-border);

    @media (max-width: 991px) {
      border-top-color: transparent;
      border-bottom-color: transparent;
    }

    &:first-child {
      border-left-color: var(--color-warning-border);

      @media (max-width: 991px) {
        border-left-color: transparent;
      }
    }

    &:last-child {
      border-right-color: var(--color-warning-border);

      @media (max-width: 991px) {
        border-right-color: transparent;
      }
    }
  }
}

tr.is-error {
  border: vw(1) solid var(--color-error-border);

  @media (max-width: 991px) {
    background-color: var(--color-error);
  }

  td {
    background-color: var(--color-error);
    border-top-color: var(--color-error-border);
    border-bottom-color: var(--color-error-border);

    @media (max-width: 991px) {
      border-top-color: transparent;
      border-bottom-color: transparent;
    }

    &:first-child {
      border-left-color: var(--color-error-border);

      @media (max-width: 991px) {
        border-left-color: transparent;
      }
    }

    &:last-child {
      border-right-color: var(--color-error-border);

      @media (max-width: 991px) {
        border-right-color: transparent;
      }
    }
  }
}

tbody .sub-header {
  margin: 0;
  height: vw(25) !important;
  display: block;

  @media (max-width: 991px) {
    height: vw(20, $mobile) !important;
    min-height: vw(23, $mobile) !important;
    padding: 0 !important;
    margin-top: 0;
  }
}

.sub-header td {
  position: relative;
  overflow: visible;
  width: vw(110);
  height: 0;
  margin: 0;

  div {
    position: absolute;
    top: vw(-10);
    left: 0;
    width: vw(300);
    margin: 0;
    font-size: vw(15);
    font-weight: 500;
    line-height: vw(20);

    @media (max-width: 991px) {
      font-size: vw(15, $mobile);
      line-height: vw(20, $mobile);
      top: 0;
      width: vw(300, $mobile);
    }
  }
}

.table-cell {
  &--title {
    @media (max-width: 991px) {
      order: 2;
      font-size: vw(22, $mobile);
      line-height: vw(30, $mobile);
      font-weight: 600;
      padding: 0;
      border: none;

      div {
        margin: 0;
      }
    }
  }

  &--id {
    text-align: center;
    width: vw(73);

    div {
      margin: 0;
    }

    @media (max-width: 991px) {
      position: absolute;
      bottom: vw(40, $mobile);
      left: vw(20, $mobile);
      width: vw(71, $mobile);
      display: flex;
      flex-direction: row;
      gap: vw(4, $mobile);
      font-size: vw(16, $mobile);
      line-height: vw(20, $mobile);
      color: var(--color-gray-700);
    }

    div {
      margin: 0;
    }

    .mobile-text {
      display: none;

      @media (max-width: 991px) {
        display: block;
      }
    }

    .mobile-text--separator {
      display: none;

      @media (max-width: 991px) {
        display: block;
        color: var(--color-gray-600);
        transform: translateY(-2px);
        flex: auto;
        text-align: right;
      }
    }
  }

  &--email {
    width: 20%;

    @media (max-width: 991px) {
      position: absolute;
      bottom: vw(40, $mobile);
      left: vw(101, $mobile);
      font-size: vw(20, $mobile);
      line-height: vw(30, $mobile);
      color: var(--color-gray-700);
    }

    div {
      margin: 0;
    }
  }

  &--views {
    text-align: center;
    width: vw(100);
    min-width: vw(100);
    padding: 0;
    font-size: vw(12);

    div {
      width: vw(100);
      margin: 0;
    }

    @media (max-width: 991px) {
      position: absolute;
      bottom: vw(10, $mobile);
      left: vw(20, $mobile);
      width: vw(230, $mobile);
      display: flex;
      flex-direction: row;
      justify-content: flex-start;
      gap: vw(39, $mobile);
      font-size: vw(16, $mobile);
      line-height: vw(20, $mobile);
      color: var(--color-gray-700);

      .mobile-text {
        width: vw(86, $mobile);
      }
    }
  }

  &--redirect {
    text-align: center;
    width: vw(80);
    padding: 0;
    font-size: vw(12);

    @media (max-width: 991px) {
      position: absolute;
      bottom: vw(10, $mobile);
      left: vw(260, $mobile);
      width: vw(71, $mobile);
      display: flex;
      flex-direction: row;
      gap: vw(4, $mobile);
      font-size: vw(16, $mobile);
      line-height: vw(20, $mobile);
      color: var(--color-gray-700);
    }
  }

  &--favorite {
    text-align: center;
    width: vw(80);
    padding: 0;
    font-size: vw(12);

    @media (max-width: 991px) {
      position: absolute;
      bottom: vw(10, $mobile);
      left: vw(330, $mobile);
      width: vw(71, $mobile);
      display: flex;
      flex-direction: row;
      gap: vw(4, $mobile);
      font-size: vw(16, $mobile);
      line-height: vw(20, $mobile);
      color: var(--color-gray-700);
    }
  }
}

thead tr td *,
tbody tr td * {
  margin-top: 0;
  margin-bottom: 0;
}

thead tr,
thead tr th {
  height: vw(40);
  min-height: vw(40);
  padding-top: 0;
  padding-bottom: 0;
}

.date-text {
  @media (max-width: 991px) {
    position: absolute;
    top: vw(15, $mobile);
    left: vw(20, $mobile);
    font-size: vw(16, $mobile);
    line-height: vw(20, $mobile);
  }
}

.mobile-text {
  display: none;

  @media (max-width: 991px) {
    display: block;
  }
}
</style>
