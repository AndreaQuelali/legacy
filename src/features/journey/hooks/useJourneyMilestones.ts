"use client"

import { useTranslations } from 'next-intl'

export interface Milestone {
  id: string
  date: string
  title: string
  desc: string
  icon: string
  image: string
}

export function useJourneyMilestones(): Milestone[] {
  const t = useTranslations('journey')

  return [
    {
      id: t("milestone1.id"),
      date: t("milestone1.date"),
      title: t("milestone1.title"),
      desc: t("milestone1.desc"),
      icon: "stadium",
      image: "/images/journey/01-opening.jpg"
    },
    {
      id: t("milestone2.id"),
      date: t("milestone2.date"),
      title: t("milestone2.title"),
      desc: t("milestone2.desc"),
      icon: "groups",
      image: "/images/journey/02-groups.jpg"
    },
    {
      id: t("milestone3.id"),
      date: t("milestone3.date"),
      title: t("milestone3.title"),
      desc: t("milestone3.desc"),
      icon: "account_tree",
      image: "/images/journey/03-round32.jpg"
    },
    {
      id: t("milestone4.id"),
      date: t("milestone4.date"),
      title: t("milestone4.title"),
      desc: t("milestone4.desc"),
      icon: "sports_soccer",
      image: "/images/journey/04-round16.jpg"
    },
    {
      id: t("milestone5.id"),
      date: t("milestone5.date"),
      title: t("milestone5.title"),
      desc: t("milestone5.desc"),
      icon: "location_city",
      image: "/images/journey/05-quarters.jpg"
    },
    {
      id: t("milestone6.id"),
      date: t("milestone6.date"),
      title: t("milestone6.title"),
      desc: t("milestone6.desc"),
      icon: "star",
      image: "/images/journey/06-semis.jpg"
    },
    {
      id: t("milestone7.id"),
      date: t("milestone7.date"),
      title: t("milestone7.title"),
      desc: t("milestone7.desc"),
      icon: "trophy",
      image: "/images/journey/07-final.jpg"
    },
  ]
}
